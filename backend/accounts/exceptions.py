from typing import Any, Optional

from rest_framework.response import Response
from rest_framework.views import exception_handler


def core_exception_handler(exc: Exception, context: dict[str, Any]) -> Optional[Response]:
    """Error handler for the API."""
    response = exception_handler(exc, context)
    handlers = {'ValidationError': _handle_generic_error}

    exception_class = exc.__class__.__name__

    if exception_class in handlers:

        return handlers[exception_class](exc, context, response)

    return response


def _handle_generic_error(exc: Exception, context: dict[str, Any], response: Optional[Response]) -> Optional[Response]:
    if response:
        response.data = {'errors': response.data}

        return response
    return None
