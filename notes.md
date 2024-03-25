To build it up:

```
docker-compose up -d --build
```

To make migration

```
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```

| User          | Permissions                                                                |
| ------------- | -------------------------------------------------------------------------- |
| Anonymous     | Only sees login/Register Pages and Home page                               |
| Authenticated | Sees Profile and Tests Page but can't start a test or see other uses (yet) |
| Admin         | Can see all users and make tests for users and edit user profiles          |
