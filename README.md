# Angular WePay Service

WePay service used to integrate WePay Elements with Angular. Forked from (https://github.com/fireflysemantics/angular-stripe-service)

## Documentation

[Integrating WePay Elements with Angular](https://developer.fireflysemantics.com/tasks/tasks--angular--integrating-stripe-elements-with-angular)

## Stackblitz

[Stackblitz Demo](https://stackblitz.com/edit/angular-stripe-integration-fs)

## Usage

```
  constructor(
    private cd: ChangeDetectorRef,
    private wepayService:AngularwepayService) {}

  ngAfterViewInit() {
    this.wepayService.setPublishableKey('pk_test_2syov9fTMRwOxYG97AAXbOgt008X6NL46o').then(
      wepay=> {
        this.wepay = wepay;
    const elements = wepay.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    });
}
```

## Why?

The `@givtnl/angular-wepay-service` service injects the wepay scripts for us and waits for it to load before attempting to initialize elements.

The reason this is important is that if our component containing the wepay form is loaded before wepay has a chance to initialize elements then the form will not paint correctly.

In other words the wepay API download and subsequent elements construction is racing the construction of the credit card form component.

If the form component wins that race, the component does not get constructed right, because elements is not yet available.