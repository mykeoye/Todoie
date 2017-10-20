# ReactJS Test

Application to be used to test some skills. It is not required to know most of the toolset below before making this test -- you need to know basically JS, ReactJS and Redux (flux) and you are good to go.

## App Toolset

- ReactJS
- Redux
- react-router (v3) ([learn more](https://github.com/ReactTraining/react-router))
- redux-saga ([learn more](http://yelouafi.github.io/redux-saga/))
- Tachyons ([learn more](http://tachyons.io/))
- Feature-centric folder structure ([learn more](https://www.notion.so/Folders-Structure-0a8b8eeb07a748db97814b9e8d1397fb))
- StandardJS (JavaScript Style Guide) ([learn more](http://standardjs.com/))
- Webpack
- NodeJS
- Yarn (better alternative to npm) ([learn more](http://yarnpkg.com))
- Server-side rendering with Client and Server hot reloading

## Quick Start

1. Make sure you have [Node.js](https://nodejs.org/) installed (v6.0+ required)
2. [Install Yarn](https://yarnpkg.com/en/docs/install)
3. Run `yarn install`
4. `npm run dev`
5. Check out `http://localhost:3000`
6. Have fun!

## API

Everything is saved automatically via redux-storage on browser localStorage. There is a fake API on `src/config/api`, where you will find the following endpoints with the responses:

**`GET /todos`**

    200 OK

    {
      ok: true,
      problem: "NONE",
      data: {
        todos: [
          {
            id: "41701948-7d3c-457d-8b06-7293b24309b3",
            createdAt: "2016-12-06T06:08:40.447Z",
            completed: true,
            listID: "def456",
            text: "A great todo ",
            ...and any other list attributes you want
          },
          {
            id: "60d0ec43-f9a1-44ce-b20b-ae8578737045",
            createdAt: "2016-12-06T06:08:27.939Z",
            completed: false,
            listID: "abc123",
            text: "Another great todo ",
            ...and any other list attributes you want
          }
        ]
      }
    }

**`GET /todos/:id`**

    200 OK

    {
      ok: true,
      problem: "NONE",
      data: {
        todo: [
          {
            id: "41701948-7d3c-457d-8b06-7293b24309b3",
            createdAt: "2016-12-06T06:08:40.447Z",
            completed: true,
            listID: "def456",
            text: "A great todo ",
            ...and any other list attributes you want
          }
        ]
      }
    }


**`GET /lists/:id`**

    200 OK

    {
      ok: true,
      problem: "NONE",
      data: {
        list: [
          {
            id: "abc123",
            createdAt: "2016-12-06T06:08:40.447Z",
            ...and any other list attributes you want,
            todos: [
              {
                id: "41701948-7d3c-457d-8b06-7293b24309b3",
                createdAt: "2016-12-06T06:08:40.447Z",
                completed: true,
                listID: "abc123 ",
                text: "A great todo ",
                ...and any other list attributes you want
              }
            ]
          }
        ]
      }
    }


**`GET /lists`**

    200 OK

    {
      ok: true,
      problem: "NONE",
      data: {
        lists: [
          {
            id: "abc123",
            createdAt: "2016-12-06T06:08:40.447Z",
            name: "A Productive List",
            ...and any other list attributes you want
          },
          {
            id: "def456",
            createdAt: "2016-12-06T06:08:50.447Z",
            name: "Another Productive List",
            ...and any other list attributes you want
          }
        ]
      }
    }


**`GET /:any`**

    404 Not Found

    {
      ok: false,
      problem: "CLIENT_ERROR",
      data: {
        error: 'Item not found'
      }
    }


**`POST /lists`**

**Accepted attributes:**

| Attr | Description                  | Required |  
| ---- | ---------------------------- | ---------|  
| name | the name of the list         | true     |
| any  | any other attribute you want | false    |

    200 OK

    {
      ok: true,
      problem: "NONE",
      data: {
        list: {
          id: "abc123",
          createdAt: "2016-12-06T06:08:40.447Z",
          name: "A Productive List",
          ...and any other list attributes you want
        }
      }
    }


**`POST /todos`**

**Accepted attributes:**

| Attr    | Description                    | Required |  
| ------- | ------------------------------ | ---------|  
| text    | the body of the item           | true     |
| listID  | the parent list of the item    | true     |
| any     | any other attribute you want   | false    |

    200 OK

    {
      ok: true,
      problem: "NONE",
      data: {
        todo: {
          id: "abc123",
          createdAt: "2016-12-06T06:08:40.447Z",
          completed: false,
          listID: "def456",
          ...and any other todo attributes you want
        }
      }
    }


**`PUT /todos/:id`**

**Accepted attributes:**

| Attr       | Description                   | Required |  
| ---------- | ----------------------------- | ---------|  
| text       | the body of the it            | true     |
| completed  | if this todo was completed    | true     |
| any        | any other attribute you wan   | false    |

    200 OK

    {
      ok: true,
      problem: "NONE",
      data: {
        todo: {
          id: "abc123",
          createdAt: "2016-12-06T06:08:40.447Z",
          completed: false,
          listID: "def456",
          ...and any other todo attributes you want
        }
      }
    }
