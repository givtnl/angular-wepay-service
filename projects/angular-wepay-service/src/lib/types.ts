export interface WePay {
  configure: (environment: string, appId: string, apiVersion: string) => any
  createCreditCardIframe: (iframeContainerId: string, options: any) => any
  createKYCIframe: (iframeContainerId: string, options: any) => any
  createPayoutMethodIframe: (iframeContainerId: string, options: any) => any
}
