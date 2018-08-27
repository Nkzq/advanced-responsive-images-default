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

You need to specifiy some images sizes in `src/sizes.json` like below :
````json
[
  {
    "img-300-200": {
      "width": "300",
      "height": "200",
      "crop": true
    },
    "img-600-400": {
      "width": "600",
      "height": "400",
      "crop": true
    },
    "img-100-100": {
      "width": "100",
      "height": "100",
      "crop": true
    },
    "img-200-200": {
      "width": "200",
      "height": "200",
      "crop": true
    }
  }
]
````

## Sketch Artboard and Group naming

Your Sketch should look like this :
- an Artboard `Default image``
- a Group `default`

![Sketch Screenshot](/sketch-screenshot.png?raw=true)
