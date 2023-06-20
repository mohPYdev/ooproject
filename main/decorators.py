from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import permission_classes

from django.core.cache import cache
from functools import wraps




def base_decorator(func):
    def wrapper(*args, **kwargs):
        print('this is the base form of decorators')
        return func(*args, **kwargs)
    return wrapper



def login_authentication_decorator(func):
    def wrapper(*args, **kwargs):
        username = args[0].data.get('username')
        password = args[0].data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)

            args[0].auth = token

            return func(*args, **kwargs)
        else:
            return Response({"error": "Invalid username or password"}, status=401)

    return wrapper


def logging_info_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Request: {args}, {kwargs}")
        response = func(*args, **kwargs)
        print(f"Response: {response}")
        return response
    return wrapper


def permission_decorator(permissions):
    def decorator(func):
        @permission_classes(permissions)
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper
    return decorator



def throttle_decorator(throttle_classes):
    def decorator(func):
        for throttle_class in throttle_classes:
            func = throttle_class()(func)
        return func
    return decorator


def cache_decorator(cache_timeout):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            cache_key = f'{func.__name__}:{args}:{kwargs}'

            result = cache.get(cache_key)
            if result is not None:
                return result

            result = func(*args, **kwargs)
            cache.set(cache_key, result, cache_timeout)

            return result
        return wrapper
    return decorator