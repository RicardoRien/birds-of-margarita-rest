# birds-of-margarita-rest

This project was created using:

- JavaScript
- NodeJs
- ExpressJs
- Express-session
- SqLite
- PostgreSQL
- dotenv
- Helmet
- Cors

## How to use:

## For Developers
Donwload the project and install dependecies with _npm i_ the run _npm run develop_ or _npm start_

# Common users:

## Donwload Postman or Insomnia
## Or go to [reqbin.com](https://reqbin.com/), and download its extension

1) You have to **register** to see what the api offers.
>https://birds-margarita.herokuapp.com/api/auth/register

**Post**:

```
{
	"username": "Isaac",
	"password": "314"
}
```

2) Then, **login**.
>https://birds-margarita.herokuapp.com/api/auth/login

**Post**:

```
{
	"username": "Isaac",
	"password": "314"
}
```
> You can logout easily accesing to https://birds-margarita.herokuapp.com/api/auth/logout

3) Check _all users_ in the API and their password (**encrypted**)
>https://birds-margarita.herokuapp.com/api/users/

3.5) Chack info of a single _user_.  Write the username after _user/_ route.Be careful, **It's case sensitive**
>https://birds-margarita.herokuapp.com/api/users/isaac

### Birds of Margarita
4) Check **all** the birds that exist in the database. You will be able to read their _common name_, _scientific name_ and _description_.

**Get**:
>https://birds-margarita.herokuapp.com/api/birds/

5) Add a bird to the API. "common name" and "description" can **not** be _null_.
>https://birds-margarita.herokuapp.com/api/birds/

**Post**:

```
{
	"common_name": "Aguila Calva",
	"scientific_name": "Aguilus Aguilarus",
	"description": "Vuela sobre las planicies de la peninsula de Macanao, caza ratones."	
}
```

 6) Check a Bird by ID. Write the ID after the _birds/_ route
**Get**:
>https://birds-margarita.herokuapp.com/api/birds/7

7) Re-write bird info. Write the ID after the _birds/_ route
**Patch**:
>https://birds-margarita.herokuapp.com/api/birds/7

```
{
	"common_name": "Aguila Espartana",
	"scientific_name": "Aguilaris Espartanus",
	"description": "Vuela bajo, cazando todo tipo de animales."	
}
```

8) Delete bird info.  Write the ID after the birds/ route
**Delete**:
>https://birds-margarita.herokuapp.com/api/birds/7

### Observation of birds:
9) If you want to add an observation about a bird. Write the **ID of the bird** after the _birds/_ route and before _/observation_ (Must provide "**watcher**" and "**observation**" fields):
>https://birds-margarita.herokuapp.com/api/birds/7/observations

**Post**:

```
{
	"watcher": "Isaac",
	"observation": "Observé una bandada en Porlamar"
}
```

10) Get all the _observations_ about a **bird** .  Write the **ID of the bird** after the _birds/_ route and before _/observations_:

**Get**:
>https://birds-margarita.herokuapp.com/api/birds/7/observations

11) Delete observation. Write the **ID of the observation**  after _/observations_ route:

**Delete**: 
>https://birds-margarita.herokuapp.com/api/observations/7/

