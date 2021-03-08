# rendertron-middleware

Simple middleware for rendertron using [rendertron-middleware](https://github.com/GoogleChrome/rendertron/tree/main/middleware).  
Opinionatedly configured to skip static resources and every bot (including GoogleBot).

## Usage

```help
start the server

Options:
      --version                      Show version number               [boolean]
  -v, --verbose                      Run with verbose logging
                                                       [boolean] [default: true]
  -p, --port                         Port to bind on         [number] [required]
      --rendertronUrl, --rendertron  Rendertron proxy URL    [string] [required]
      --help                         Show help                         [boolean]
```

### Example

```bash
yarn start --port 5000 --rendertronUrl https://my-rendertron-instance/render
```
