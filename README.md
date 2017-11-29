# PanoramaViewer

Add, view and possibly compose panoramic images with either Angular or React web UI. The UI approach is similar to Xamarin's iOS/Android switch: both Angular and React bindings are thin and you can easily switch between them.

Project created using Visual Studio 2017.

Declarative api description achived by utilizing "routing-controllers" on node.js server side, and "swagger-api" on client side.
OpenApi.YAML is generated using "tsoa-routing-controllers".

Both React and Angular renderers use common RxJS-based client business logic part. Three.JS rendering is currently also stored together with business logic layer.

I have plans to also include Redux in pipeline, either in combination with RxJS or as an alternative approach with thunk or saga.

Another planned features is to generate ASP.NET core and Python/Flask server side implementations from Open API specification.
