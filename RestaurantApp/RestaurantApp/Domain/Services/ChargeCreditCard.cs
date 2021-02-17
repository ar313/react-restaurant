using AuthorizeNet.Api.Controllers;
using AuthorizeNet.Api.Contracts.V1;
using AuthorizeNet.Api.Controllers.Bases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantApp.Domain.Services
{
    public class ChargeCreditCard
    {
        public static ANetApiResponse Run(
            creditCardType creditCard,
            customerAddressType billingAddress,
            List<lineItemType> lineItems,
            decimal amount)
        {


            ApiOperationBase<ANetApiRequest, ANetApiResponse>.RunEnvironment = AuthorizeNet.Environment.SANDBOX;

            ApiOperationBase<ANetApiRequest, ANetApiResponse>.MerchantAuthentication = new merchantAuthenticationType()
            {
                name = "4r3yN5eZ7F",
                ItemElementName = ItemChoiceType.transactionKey,
                Item = "5Q226P5BjUw97nSN",
            };

            /*

            var creditCard = new creditCardType
            {
                cardNumber = "4111111111111115",
                expirationDate = "1028",
                cardCode = "123"
            };

            var billingAddress = new customerAddressType
            {
                firstName = "John",
                lastName = "Doe",
                address = "123 My St",
                city = "OurTown",
                zip = "98004"
            };
            */
            //standard api call to retrieve response
            var paymentType = new paymentType { Item = creditCard };

            // Add line Items
            //var lineItems = new lineItemType[2];
            //lineItems[0] = new lineItemType { itemId = "1", name = "t-shirt", quantity = 2, unitPrice = new Decimal(15.00) };
            //lineItems[1] = new lineItemType { itemId = "2", name = "snowboard", quantity = 1, unitPrice = new Decimal(450.00) };

            var transactionRequest = new transactionRequestType
            {
                transactionType = transactionTypeEnum.authCaptureTransaction.ToString(),

                amount = amount,
                payment = paymentType,
                billTo = billingAddress,
                lineItems = lineItems.ToArray()
            };

            var request = new createTransactionRequest { transactionRequest = transactionRequest };

            var controller = new createTransactionController(request);
            controller.Execute();

            var response = controller.GetApiResponse();

            return response;
        }
    }
}
