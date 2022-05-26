import { gql, useMutation } from "@apollo/client";

export const ORDER_CONFIRM = gql`
  mutation confirmOrderCreateMutation(
    $paymentProcess: String
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber1: String
    $phoneNumber2: String
    $address: String
    $location: String
    $area: String
    $districtOrCityName: String
    $divisionOrStateName: String
    $countryName: String
  ) {
    orderCreate(
      input: {
        paymentProcess: $paymentProcess
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber1: $phoneNumber1
        phoneNumber2: $phoneNumber2
        address: $address
        location: $location
        area: $area
        districtOrCityName: $districtOrCityName
        divisionOrStateName: $divisionOrStateName
        countryName: $countryName
      }
    ) {
      order {
        id
        consumer {
          username
          user {
            firstName
            lastName
          }

          country {
            name
            currenciesSymbol # buyer currency symbol
          }
        }

        paymentProcess
        orderNo
        quantity # total cart quantity
        vatPriceUsd
        vatPrice

        commissionUsd
        commission

        discountUsd
        discount

        offerPriceUsd
        offerPrice

        totalShippingCostUsd
        totalShippingCostUsd

        totalPriceUsd
        totalPrice

        totalPayableAmtUsd
        totalPayableAmt

        isActiveCommission
        isPaid

        orderitems {
          edges {
            node {
              id
              product {
                name
              }

              quantity #same item quantity
              vatPercentage
              vatAmountBuyer

              commissionUsd
              commissionBuyer

              discountUsd
              discountBuyer

              offerPriceUsd
              offerPriceBuyer

              subtotalUsd
              subtotalBuyer

              extraField

              # Shipping Address

              # order{

              # }
            }
          }
          pageInfo {
            hasPreviousPage
            hasNextPage

            startCursor
            endCursor
          }
        }

        shippingaddress {
          firstName
          lastName
          email
          phoneNumber1
          phoneNumber2

          address
          location
          area
          districtOrCityName
          divisionOrStateName
          countryName
        }
      }
    }
  }
`;

const useOrderConfirmMutation = () => {
  const [orderConfirmMutationHandler, { data, loading, error }] =
    useMutation(ORDER_CONFIRM);

  return {
    orderConfirmMutationHandler,
    orderConfirmData: data,
    orderConfirmLoading: loading,
    orderConfirmError: error,
  };
};

export default useOrderConfirmMutation;
