# django_svelte_jwt_auth

This is the codebase that follows the series the tutorials on building a [FullStack JWT Authentication and Authorization System with Django and SvelteKit ][1].

To run this application locally, you need to run both the `backend` and `frontend` projects. While the latter has some instructions already for spinning it up, the former can be spinned up following the instructions below.

## Run locally

To run locally

- Clone this repo:
  ```
   git clone https://github.com/Sirneij/django_svelte_jwt_auth.git
  ```
- Change directory into the `backend` folder:
  ```
   cd backend
  ```
- Create a virtual environment:

  ```
   pipenv shell
  ```

  You might opt for other dependencies management tools such as `virtualenv`, `poetry`, or `venv`. It's up to you.

- Install the dependencies:
  ```
  pipenv install
  ```
- Make migrations and migrate the database:
  ```
   python manage.py makemigrations
   python manage.py migrate
  ```
- Finally, run the application:
  ```
   python manage.py runserver
  ```

[1]: https://dev.to/sirneij/fullstack-jwt-authentication-and-authorization-system-with-django-and-sveltekit-2ih3 "FullStack JWT Authentication and Authorization System with Django and SvelteKit "
