const Template = ({ assets, initialState, Root, config }) => {
  const jsBundle = assets.main.js
  const cssBundle = assets.main.css

  return `
    <html lang='en'>
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta charSet='utf-8' />
        <meta httpEquiv='Content-Language' content='en' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link rel='stylesheet' href='https://unpkg.com/tachyons@4.5.5/css/tachyons.min.css' />

        ${cssBundle ? `<link rel='stylesheet' type='text/css' href='${cssBundle}' />` : ''}

        <title>Todo App</title>
      </head>

      <body>
        <div id='root'>${config.isDev ? `<div>${Root}</div>` : Root}</div>

        <script charSet='UTF-8'>
          window.initialState='${initialState}';
        </script>
        <script src=${jsBundle}></script>
      </body>
    </html>
  `
}

export default (props) => {
  return (
    '<!doctype html>\n' +
    Template({...props})
  )
}
