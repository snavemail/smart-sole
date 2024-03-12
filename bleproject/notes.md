To build it up:

```
docker-compose up -d --build
```

To make migration

```
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```
