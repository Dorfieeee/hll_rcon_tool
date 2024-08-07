import re
from enum import Enum
from logging import getLogger
from typing import Iterable, Literal, Sequence, Union

import pydantic
from requests.structures import CaseInsensitiveDict

logger = getLogger(__name__)

RE_LAYER_NAME = re.compile(
    r"^(?P<tag>[A-Z]{3,5})_(?P<size>S|L)_(?P<year>\d{4})_(?:(?P<environment>\w+)_)?P_(?P<gamemode>\w+)$"
)
RE_LEGACY_LAYER_NAME = re.compile(
    r"^(?P<name>[a-z0-9]+)_(?:(?P<offensive>off(?:ensive)?)_?(?P<attackers>[a-zA-Z]+)|(?P<gamemode>[a-z]+)(?:_V2)?)(?:_(?P<environment>[a-z]+))?$"
)

UNKNOWN_MODE = "unknown"
UNKNOWN_MAP_NAME = "unknown"
UNKNOWN_MAP_TAG = "UNK"


LOG_MAP_NAMES_TO_MAP = CaseInsensitiveDict(
    {
        "CARENTAN OFFENSIVE": "carentan_offensive_ger",
        "CARENTAN WARFARE": "carentan_warfare",
        "FOY OFFENSIVE": "foy_offensive_ger",
        "FOY WARFARE": "foy_warfare",
        "HILL 400 OFFENSIVE": "hill400_offensive_ger",
        "HILL 400 WARFARE": "hill400_warfare",
        "HÜRTGEN FOREST OFFENSIVE": "hurtgenforest_offensive_ger",
        "HÜRTGEN FOREST WARFARE": "hurtgenforest_warfare_V2",
        "KURSK OFFENSIVE": "kursk_offensive_ger",
        "KURSK WARFARE": "kursk_warfare",
        "Kharkov OFFENSIVE": "kharkov_offensive_rus",
        "Kharkov WARFARE": "kharkov_warfare",
        "PURPLE HEART LANE OFFENSIVE": "purpleheartlane_offensive_ger",
        "PURPLE HEART LANE WARFARE": "purpleheartlane_warfare",
        "REMAGEN OFFENSIVE": "remagen_offensive_ger",
        "REMAGEN WARFARE": "remagen_warfare",
        "SAINTE-MÈRE-ÉGLISE OFFENSIVE": "stmereeglise_offensive_ger",
        "SAINTE-MÈRE-ÉGLISE WARFARE": "stmereeglise_warfare",
        "ST MARIE DU MONT OFFENSIVE": "stmariedumont_off_ger",
        "ST MARIE DU MONT WARFARE": "stmariedumont_warfare",
        "STALINGRAD OFFENSIVE": "stalingrad_offensive_ger",
        "STALINGRAD WARFARE": "stalingrad_warfare",
        "UTAH BEACH OFFENSIVE": "utahbeach_offensive_ger",
        "UTAH BEACH WARFARE": "utahbeach_warfare",
        "OMAHA BEACH WARFARE": "omahabeach_warfare",
        "OMAHA BEACH OFFENSIVE": "omahabeach_offensive_ger",
        "DRIEL WARFARE": "driel_warfare",
        "DRIEL OFFENSIVE": "driel_offensive_ger",
        "EL ALAMEIN WARFARE": "elalamein_warfare",
        "EL ALAMEIN OFFENSIVE": "elalamein_offensive_ger",
        "MORTAIN WARFARE": "mortain_warfare_day",
        "MORTAIN OFFENSIVE": "mortain_offensiveUS_day",
    }
)

# Sourced with some minor modifications from https://github.com/timraay/Gamewatch/blob/master/


class Gamemode(str, Enum):
    WARFARE = "warfare"
    OFFENSIVE = "offensive"
    CONTROL = "control"
    PHASED = "phased"
    MAJORITY = "majority"

    @classmethod
    def large(cls):
        return (
            cls.WARFARE,
            cls.OFFENSIVE,
        )

    @classmethod
    def small(cls):
        return (
            cls.CONTROL,
            cls.PHASED,
            cls.MAJORITY,
        )

    def is_large(self):
        return self in Gamemode.large()

    def is_small(self):
        return self in Gamemode.small()


class Team(str, Enum):
    ALLIES = "Allies"
    AXIS = "Axis"


class Environment(str, Enum):
    DAWN = "Dawn"
    DAY = "Day"
    DUSK = "Dusk"
    NIGHT = "Night"
    OVERCAST = "Overcast"
    RAIN = "Rain"


class Faction(Enum):
    class Faction(pydantic.BaseModel):
        name: str
        team: Team

    CW = Faction(name="gb", team=Team.ALLIES)
    GB = Faction(name="gb", team=Team.ALLIES)
    GER = Faction(name="ger", team=Team.AXIS)
    RUS = Faction(name="rus", team=Team.ALLIES)
    US = Faction(name="us", team=Team.ALLIES)


class Map(pydantic.BaseModel):
    id: str
    name: str
    tag: str
    prettyname: str
    shortname: str
    allies: "Faction"
    axis: "Faction"

    def __str__(self) -> str:
        return self.id

    def __repr__(self) -> str:
        return str(self)

    def __hash__(self) -> int:
        return hash(self.id)

    def __eq__(self, other) -> bool:
        if isinstance(other, (Map, str)):
            return str(self) == str(other)
        return NotImplemented


class Layer(pydantic.BaseModel):
    id: str
    map: Map
    gamemode: Gamemode
    attackers: Union[Team, None] = None
    environment: Environment = Environment.DAY

    def __str__(self) -> str:
        return self.id

    def __repr__(self) -> str:
        return f"{self.__class__}(id={self.id}, map={self.map}, attackers={self.attackers}, environment={self.environment})"

    def __hash__(self) -> int:
        return hash(self.id)

    def __eq__(self, other) -> bool:
        if isinstance(other, (Layer, str)):
            return str(self) == str(other)
        return NotImplemented

    @property
    def attacking_faction(self):
        if self.attackers == Team.ALLIES:
            return self.map.allies
        elif self.attackers == Team.AXIS:
            return self.map.axis
        return None

    def pretty(self):
        out = self.map.prettyname
        if self.gamemode == Gamemode.OFFENSIVE:
            out += " Off."
            if self.attackers:
                out += f" {self.attacking_faction.value.name.upper()}"
        elif self.gamemode.is_small():
            # TODO: Remove once more Skirmish modes release
            out += " Skirmish"
        else:
            out += f" {self.gamemode.value.capitalize()}"
        if self.environment != Environment.DAY:
            out += f" ({self.environment.value})"
        return out

    @property
    def opposite_side(self) -> Literal[Team.AXIS, Team.ALLIES] | None:
        if self.attackers:
            return get_opposite_side(self.attackers)


MAPS = {
    m.id: m
    for m in (
        Map(
            id=UNKNOWN_MAP_NAME,
            name=UNKNOWN_MAP_NAME,
            tag="",
            prettyname=UNKNOWN_MAP_NAME,
            shortname=UNKNOWN_MAP_NAME,
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="stmereeglise",
            name="SAINTE-MÈRE-ÉGLISE",
            tag="SME",
            prettyname="St. Mere Eglise",
            shortname="SME",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="stmariedumont",
            name="ST MARIE DU MONT",
            tag="BRC",
            prettyname="St. Marie Du Mont",
            shortname="SMDM",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="utahbeach",
            name="UTAH BEACH",
            tag="UTA",
            prettyname="Utah Beach",
            shortname="Utah",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="omahabeach",
            name="OMAHA BEACH",
            tag="OMA",
            prettyname="Omaha Beach",
            shortname="Omaha",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="purpleheartlane",
            name="PURPLE HEART LANE",
            tag="PHL",
            prettyname="Purple Heart Lane",
            shortname="PHL",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="carentan",
            name="CARENTAN",
            tag="CAR",
            prettyname="Carentan",
            shortname="Carentan",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="hurtgenforest",
            name="HÜRTGEN FOREST",
            tag="HUR",
            prettyname="Hurtgen Forest",
            shortname="Hurtgen",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="hill400",
            name="HILL 400",
            tag="HIL",
            prettyname="Hill 400",
            shortname="Hill 400",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="foy",
            name="FOY",
            tag="FOY",
            prettyname="Foy",
            shortname="Foy",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="kursk",
            name="KURSK",
            tag="KUR",
            prettyname="Kursk",
            shortname="Kursk",
            allies=Faction.RUS,
            axis=Faction.GER,
        ),
        Map(
            id="stalingrad",
            name="STALINGRAD",
            tag="STA",
            prettyname="Stalingrad",
            shortname="Stalingrad",
            allies=Faction.RUS,
            axis=Faction.GER,
        ),
        Map(
            id="remagen",
            name="REMAGEN",
            tag="REM",
            prettyname="Remagen",
            shortname="Remagen",
            allies=Faction.US,
            axis=Faction.GER,
        ),
        Map(
            id="kharkov",
            name="Kharkov",
            tag="KHA",
            prettyname="Kharkov",
            shortname="Kharkov",
            allies=Faction.RUS,
            axis=Faction.GER,
        ),
        Map(
            id="driel",
            name="DRIEL",
            tag="DRL",
            prettyname="Driel",
            shortname="Driel",
            allies=Faction.GB,
            axis=Faction.GER,
        ),
        Map(
            id="elalamein",
            name="EL ALAMEIN",
            tag="ELA",
            prettyname="El Alamein",
            shortname="Alamein",
            allies=Faction.GB,
            axis=Faction.GER,
        ),
        Map(
            id="mortain",
            name="MORTAIN",
            tag="MOR",
            prettyname="Mortain",
            shortname="MOR",
            allies=Faction.US,
            axis=Faction.GER,
        ),
    )
}

LAYERS = {
    l.id: l
    for l in (
        # In older versions (prior to v9.8.0) map names could be recorded as bla_
        # if the map name could not be retrieved from the game server
        Layer(id="bla_", map=MAPS[UNKNOWN_MAP_NAME], gamemode=Gamemode.WARFARE),
        Layer(
            id=UNKNOWN_MAP_NAME, map=MAPS[UNKNOWN_MAP_NAME], gamemode=Gamemode.WARFARE
        ),
        Layer(
            id="stmereeglise_warfare",
            map=MAPS["stmereeglise"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="stmereeglise_warfare_night",
            map=MAPS["stmereeglise"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="stmereeglise_offensive_us",
            map=MAPS["stmereeglise"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="stmereeglise_offensive_ger",
            map=MAPS["stmereeglise"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="SME_S_1944_Day_P_Skirmish",
            map=MAPS["stmereeglise"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DAY,
        ),
        Layer(
            id="SME_S_1944_Morning_P_Skirmish",
            map=MAPS["stmereeglise"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DAWN,
        ),
        Layer(
            id="SME_S_1944_Night_P_Skirmish",
            map=MAPS["stmereeglise"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="stmariedumont_warfare",
            map=MAPS["stmariedumont"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="stmariedumont_warfare_night",
            map=MAPS["stmariedumont"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="stmariedumont_off_us",
            map=MAPS["stmariedumont"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="stmariedumont_off_ger",
            map=MAPS["stmariedumont"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="utahbeach_warfare",
            map=MAPS["utahbeach"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="utahbeach_warfare_night",
            map=MAPS["utahbeach"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="utahbeach_offensive_us",
            map=MAPS["utahbeach"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="utahbeach_offensive_ger",
            map=MAPS["utahbeach"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="omahabeach_warfare",
            map=MAPS["omahabeach"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="omahabeach_warfare_night",
            map=MAPS["omahabeach"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="omahabeach_offensive_us",
            map=MAPS["omahabeach"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="omahabeach_offensive_ger",
            map=MAPS["omahabeach"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="purpleheartlane_warfare",
            map=MAPS["purpleheartlane"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="purpleheartlane_warfare_night",
            map=MAPS["purpleheartlane"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="purpleheartlane_offensive_us",
            map=MAPS["purpleheartlane"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="purpleheartlane_offensive_ger",
            map=MAPS["purpleheartlane"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="carentan_warfare",
            map=MAPS["carentan"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="carentan_warfare_night",
            map=MAPS["carentan"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="carentan_offensive_us",
            map=MAPS["carentan"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="carentan_offensive_ger",
            map=MAPS["carentan"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="CAR_S_1944_Day_P_Skirmish",
            map=MAPS["carentan"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DAY,
        ),
        Layer(
            id="CAR_S_1944_Rain_P_Skirmish",
            map=MAPS["carentan"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.RAIN,
        ),
        Layer(
            id="CAR_S_1944_Dusk_P_Skirmish",
            map=MAPS["carentan"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DUSK,
        ),
        Layer(
            id="hurtgenforest_warfare_V2",
            map=MAPS["hurtgenforest"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="hurtgenforest_warfare_V2_night",
            map=MAPS["hurtgenforest"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="hurtgenforest_offensive_US",
            map=MAPS["hurtgenforest"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="hurtgenforest_offensive_ger",
            map=MAPS["hurtgenforest"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="hill400_warfare",
            map=MAPS["hill400"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="hill400_warfare_night",
            map=MAPS["hill400"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="hill400_offensive_US",
            map=MAPS["hill400"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="hill400_offensive_ger",
            map=MAPS["hill400"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="foy_warfare",
            map=MAPS["foy"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="foy_warfare_night",
            map=MAPS["foy"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="foy_offensive_us",
            map=MAPS["foy"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="foy_offensive_ger",
            map=MAPS["foy"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="kursk_warfare",
            map=MAPS["kursk"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="kursk_warfare_night",
            map=MAPS["kursk"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="kursk_offensive_rus",
            map=MAPS["kursk"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="kursk_offensive_ger",
            map=MAPS["kursk"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="stalingrad_warfare",
            map=MAPS["stalingrad"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="stalingrad_warfare_night",
            map=MAPS["stalingrad"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="stalingrad_offensive_rus",
            map=MAPS["stalingrad"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="stalingrad_offensive_ger",
            map=MAPS["stalingrad"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="remagen_warfare",
            map=MAPS["remagen"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="remagen_warfare_night",
            map=MAPS["remagen"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="remagen_offensive_us",
            map=MAPS["remagen"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="remagen_offensive_ger",
            map=MAPS["remagen"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="kharkov_warfare",
            map=MAPS["kharkov"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="kharkov_warfare_night",
            map=MAPS["kharkov"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="kharkov_offensive_rus",
            map=MAPS["kharkov"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="kharkov_offensive_ger",
            map=MAPS["kharkov"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="driel_warfare",
            map=MAPS["driel"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="driel_warfare_night",
            map=MAPS["driel"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="driel_offensive_us",
            map=MAPS["driel"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="driel_offensive_ger",
            map=MAPS["driel"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="DRL_S_1944_P_Skirmish",
            map=MAPS["driel"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DAWN,
        ),
        Layer(
            id="DRL_S_1944_Night_P_Skirmish",
            map=MAPS["driel"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="DRL_S_1944_Day_P_Skirmish",
            map=MAPS["driel"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DAY,
        ),
        Layer(
            id="elalamein_warfare",
            map=MAPS["elalamein"],
            gamemode=Gamemode.WARFARE,
        ),
        Layer(
            id="elalamein_warfare_night",
            map=MAPS["elalamein"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.DUSK,
        ),
        Layer(
            id="elalamein_offensive_CW",
            map=MAPS["elalamein"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="elalamein_offensive_ger",
            map=MAPS["elalamein"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="ELA_S_1942_P_Skirmish",
            map=MAPS["elalamein"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DAY,
        ),
        Layer(
            id="ELA_S_1942_Night_P_Skirmish",
            map=MAPS["elalamein"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.DUSK,
        ),
        Layer(
            id="SMDM_S_1944_Day_P_Skirmish",
            map=MAPS["stmariedumont"],
            gamemode=Gamemode.CONTROL,
        ),
        Layer(
            id="SMDM_S_1944_Night_P_Skirmish",
            map=MAPS["stmariedumont"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.NIGHT,
        ),
        Layer(
            id="SMDM_S_1944_Rain_P_Skirmish",
            map=MAPS["stmariedumont"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.RAIN,
        ),
        Layer(id="mortain_warfare_day", map=MAPS["mortain"], gamemode=Gamemode.WARFARE),
        Layer(
            id="mortain_warfare_overcast",
            map=MAPS["mortain"],
            gamemode=Gamemode.WARFARE,
            environment=Environment.OVERCAST,
        ),
        Layer(
            id="mortain_offensiveUS_day",
            map=MAPS["mortain"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
        ),
        Layer(
            id="mortain_offensiveUS_overcast",
            map=MAPS["mortain"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.ALLIES,
            environment=Environment.OVERCAST,
        ),
        Layer(
            id="mortain_offensiveger_day",
            map=MAPS["mortain"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
        ),
        Layer(
            id="mortain_offensiveger_overcast",
            map=MAPS["mortain"],
            gamemode=Gamemode.OFFENSIVE,
            attackers=Team.AXIS,
            environment=Environment.OVERCAST,
        ),
        Layer(
            id="mortain_skirmish_day",
            map=MAPS["mortain"],
            gamemode=Gamemode.CONTROL,
        ),
        Layer(
            id="mortain_skirmish_overcast",
            map=MAPS["mortain"],
            gamemode=Gamemode.CONTROL,
            environment=Environment.OVERCAST,
        ),
    )
}


def parse_layer(layer_name: str | Layer) -> Layer:
    if isinstance(layer_name, Layer):
        layer_name = str(layer_name)
    elif is_server_loading_map(map_name=layer_name):
        return LAYERS[UNKNOWN_MAP_NAME]

    layer = LAYERS.get(layer_name)
    if layer:
        return layer

    getLogger().warning("Unknown layer %s", layer_name)

    layer_match = RE_LAYER_NAME.match(layer_name)
    if not layer_match:
        return _parse_legacy_layer(layer_name)

    layer_data = layer_match.groupdict()

    tag = layer_data["tag"]
    map_ = None
    for m in MAPS.values():
        if m.tag == tag:
            map_ = m
            break
    if map_ is None:
        map_ = Map(
            id=tag.lower(),
            name=tag,
            tag=tag,
            prettyname=tag.capitalize(),
            shortname=tag,
            allies=Faction.US,
            axis=Faction.GER,
        )

    try:
        gamemode = Gamemode[layer_data["gamemode"].upper()]
    except KeyError:
        gamemode = Gamemode.WARFARE
    else:
        if gamemode == Gamemode.OFFENSIVE:
            attackers = Team.ALLIES
        else:
            attackers = None

    if layer_data["environment"]:
        try:
            environment = Environment[layer_data["environment"].upper()]
        except KeyError:
            environment = Environment.DAY
    else:
        environment = Environment.DAY

    return Layer(
        id=layer_name,
        map=map_,
        gamemode=gamemode,
        attackers=attackers,
        environment=environment,
    )


def _parse_legacy_layer(layer_name: str):
    layer_match = RE_LEGACY_LAYER_NAME.match(layer_name)
    if not layer_match:
        raise ValueError("Unparsable layer '%s'" % layer_name)

    layer_data = layer_match.groupdict()

    name = layer_data["name"]
    map_ = MAPS.get(layer_data["name"])
    if not map_:
        map_ = Map(
            id=name,
            name=name.capitalize(),
            tag=name.upper(),
            prettyname=name.capitalize(),
            shortname=name.capitalize(),
            allies=Faction.US,
            axis=Faction.GER,
        )

    result = Layer(id=layer_name, map=map_, gamemode=Gamemode.WARFARE)

    if layer_data["offensive"]:
        result.gamemode = Gamemode.OFFENSIVE
        try:
            result.attackers = Faction[layer_data["attackers"].upper()].value.team
        except KeyError:
            pass

    elif layer_data["gamemode"]:
        try:
            result.gamemode = Gamemode[layer_data["gamemode"].upper()]
        except KeyError:
            pass

    environment = layer_data["environment"]
    if environment:
        try:
            result.environment = Environment[environment.upper()]
        except KeyError:
            pass

    return result


def get_opposite_side(team: Team) -> Literal[Team.AXIS, Team.ALLIES]:
    return Team.AXIS if team == Team.ALLIES else Team.ALLIES


def sort_maps_by_gamemode(maps: Sequence[Layer]) -> list[Layer]:
    warfare = [m for m in maps if m.gamemode == Gamemode.WARFARE]
    offensive = [m for m in maps if m.gamemode == Gamemode.OFFENSIVE]
    control = [m for m in maps if m.gamemode == Gamemode.CONTROL]
    phased = [m for m in maps if m.gamemode == Gamemode.PHASED]
    majority = [m for m in maps if m.gamemode == Gamemode.MAJORITY]

    return warfare + offensive + control + phased + majority


def numbered_maps(maps: list[Layer]) -> dict[str, Layer]:
    # Control the order of the maps so they present in a sensible fashion in messages
    ordered_maps = sort_maps_by_gamemode(maps)
    return {str(idx): map_ for idx, map_ in enumerate(ordered_maps)}


def categorize_maps(maps: Iterable[Layer]) -> dict[Gamemode, list[Layer]]:
    categories = {
        Gamemode.OFFENSIVE: [
            map_ for map_ in maps if map_.gamemode == Gamemode.OFFENSIVE
        ],
        Gamemode.WARFARE: [map_ for map_ in maps if map_.gamemode == Gamemode.WARFARE],
        Gamemode.CONTROL: [map_ for map_ in maps if map_.gamemode == Gamemode.CONTROL],
    }

    return categories


def safe_get_map_name(map_name: str, pretty: bool = True) -> str:
    """Return the RCON map name if not found"""
    map_ = parse_layer(map_name)

    if map_ is None:
        return map_name

    if pretty:
        return map_.pretty()
    else:
        return map_.map.name


def is_server_loading_map(map_name: str) -> bool:
    return "untitled" in map_name.lower()
