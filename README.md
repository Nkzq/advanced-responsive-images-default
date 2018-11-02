# advanced-responsive-images-default

_This plugin was created using `skpm`. For a detailed explanation on how things work, checkout the [skpm Readme](https://github.com/skpm/skpm/blob/master/README.md)._

This Sketch plugin generate default images for : [https://github.com/asadowski10/advanced-responsive-images](https://github.com/asadowski10/advanced-responsive-images)

## Usage

Install the dependencies

```bash
npm install
```

Once the installation is done, you can run some commands inside the project folder:

```bash
npm run build
```

To watch for changes:

```bash
npm run watch
```

Additionally, if you wish to run the plugin every time it is built:

```bash
npm run start
```

## Images sizes

For the first prompt, you have to give the path of your image-locations.json file. It should look like this
````json
[
  {
    "header-logo": [
      {
        "srcsets": [
          {
            "srcset": "",
            "size": "img-65-15"
          },
          {
            "srcset": "2x",
            "size": "img-130-32"
          }
        ],
        "default_img": "default-65-15.jpg",
        "img_base": "img-65-15"
      }
    ],
    "footer-logo": [
      {
        "srcsets": [
          {
            "srcset": "",
            "size": "img-115-20"
          },
          {
            "srcset": "2x",
            "size": "img-230-42"
          }
        ],
        "default_img": "default-115-20.jpg",
        "img_base": "img-115-20"
      }
    ]
  }
]
````

## Sketch Artboard and Group naming

Your Sketch should look like this :
- an Artboard `Default image``
- a Group `default`

![Sketch Screenshot](/sketch-screenshot.png?raw=true)

## Knows Issue

Sometimes, the logo will not be correctly vertically align. This is due to a lack of Sketch API documentation about Actions.
