import json
import logging

from django.contrib.auth.decorators import permission_required
from django.views.decorators.csrf import csrf_exempt

from rcon import player_history
from rcon.player_history import get_player_comments, post_player_comments

from .audit_log import record_audit
from .auth import RconJsonResponse, login_required
from .decorators import require_content_type, require_http_methods
from .utils import _get_data

logger = logging.getLogger("rconweb")


@csrf_exempt
@login_required()
@permission_required("api.can_view_player_messages", raise_exception=True)
@require_http_methods(["GET"])
def get_player_messages(request):
    data = _get_data(request)
    res = None
    try:
        res = player_history.get_player_messages(steam_id_64=data.get("steam_id_64"))
        failed = False
    except:
        logger.exception("Unable to get player message history")
        failed = True

    return RconJsonResponse(
        {
            "result": res,
            "command": "player_messages",
            "arguments": data,
            "failed": failed,
        }
    )


@csrf_exempt
@login_required()
@permission_required("api.can_view_player_comments", raise_exception=True)
@require_http_methods(["GET"])
def get_player_comment(request):
    data = _get_data(request)
    res = None
    try:
        res = get_player_comments(steam_id_64=data["steam_id_64"])
        failed = False
    except:
        logger.exception("Unable to get player comments")
        failed = True

    return RconJsonResponse(
        {
            "result": res,
            "command": "player_comments",
            "arguments": data,
            "failed": failed,
        }
    )


@csrf_exempt
@login_required()
@permission_required("api.can_add_player_comments", raise_exception=True)
@require_http_methods(["POST"])
@require_content_type()
@record_audit
def post_player_comment(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        data = request.GET

    try:
        post_player_comments(
            steam_id_64=data["steam_id_64"],
            comment=data["comment"],
            user=request.user.username,
        )
        failed = False
    except:
        failed = True
        logger.exception("Unable to get player comments")

    return RconJsonResponse(
        {
            "result": "",
            "command": "player_comments",
            "arguments": data,
            "failed": failed,
        }
    )
