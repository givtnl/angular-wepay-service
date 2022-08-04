# Angular WePay Service

WePay service used to integrate WePay Elements with Angular. Forked from (https://github.com/fireflysemantics/angular-stripe-service).

The WePay javascript code can dynamically be loaded into your angular project. The library can then build the WePay iframe (currently only creditcard supported), after which you can use it to tokenize the credit card details. This token you can then send to your backend to handle further payments.

## Usage

```
  constructor(
    private cd: ChangeDetectorRef,
    private wepayService:AngularwepayService) {}

  ngAfterViewInit() {
    // Styling options documented here: https://dev.wepay.com/clear/cookbooks/style-credit-card-iframes/
    const custom_style = {
      'styles': {
          'cvv-icon': {
              'base': {
                  'display': 'none'
              }
          },
          'base': {
              'height': '44px',
              'margin': '0',
              'border-radius': '4px',
              'font-family': 'Avenir',
              'font-size': '16px',
              'color': '#2C2B57',
              '::placeholder': {
                  'color': '#BCB9C8'
              },
              ':focus': {
                  'border': '1px solid #2C2B57'
              }
          },
          'invalid': {
              'border': '2px solid #D73C49'
          },
          'valid': {
              'border': '1px solid #41C98E'
          },
          'errors': {
              'invalid': {
                  'color': '#D73C49'
              }
          }
      }
    };
    // iframe options documented here: https://dev.wepay.com/clear/cookbooks/style-credit-card-iframes/
    const options = {
        custom_style: custom_style,
        show_labels: false,
        show_placeholders: true,
        show_error_messages: false,
        show_error_messages_when_unfocused: false
    };

    this.wePayService.create().then(
        wepay => {
            this.wepay = wepay;

            // javascript library docs: https://dev.wepay.com/sdks-and-libraries/helper-js/
            // https://dev.wepay.com/clear/create-payment-methods/
            // The non minimized library can be found here: https://cdn.wepay.com/wepay.full.js

            let error = wepay.configure(
                environment.production ? "production" : "stage",
                environment.wePayAppId, apiVersion);
            
            if (error) {
                console.log(error)
            };


            this.creditCard = wepay.createCreditCardIframe(iframeContainerId, null);
            document.getElementById(iframeContainerId)?.children[0].addEventListener('load', function() {
                console.log("Finished loading iframe!");
            })
        }
    )
}
```

## For development
1. Clone this repo
2. `npm install`
3. `ng build`

4. In your target project, do `npm install [git folder path]/dist/angular-wepay-service (this will create a simlink)

## To publish to npm
1. npm run ig
2. npm run p

## Why?

The `@givtnl/angular-wepay-service` service injects the wepay scripts for us and waits for it to load before attempting to initialize elements.

The reason this is important is that if our component containing the wepay form is loaded before wepay has a chance to initialize elements then the form will not paint correctly.

In other words the wepay API download and subsequent elements construction is racing the construction of the credit card form component.

If the form component wins that race, the component does not get constructed right, because elements is not yet available.