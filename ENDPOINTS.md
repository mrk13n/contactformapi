**Endpoint:** `/country/` - list of all countries

```
[
  {
    code: 'UA',
    name: 'Ukraine'
  },
  {
    code: 'CA',
    name: 'Canada'
  },
  {...},
  {
    code: 'US',
    name: 'United States'
  }
]
```


**Endpoint:** `/country/:code` - specific country by code
```
{
  code: 'CA',
  name: 'Canada',
  states: [
    {
      code: 'ON',
      name: 'Ontario'
    },
    {...},
    {
      code: 'BC',
      name: 'British Columbia'
    },
  ]
}
```


**Endpoint:** `/country/:code/:stateCode` - list of cities 
```
{
  code: 'ON',
  name: 'Ontario',
  cities: [
    {
      name: 'Toronto'
    },
    {...},
    {
      name: 'London'
    },
  ]
}
```
