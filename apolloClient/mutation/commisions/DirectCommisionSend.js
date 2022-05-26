import { gql, useMutation } from "@apollo/client";
import { GET_COMMISION } from "../../queries/commision/commisionall";

export const DIRECT_SEND_COMMISION = gql`
mutation(
    $sendingAmt:Float!
    $totalSellAmt:Float!
    $consumerReceiverId:ID!
    $productDetails:String
){
  directCommissionMutation(
    input:{
  	  sendingAmt:$sendingAmt
      productDetails:$productDetails
      consumerReceiverId:$consumerReceiverId
      totalSellAmt:$totalSellAmt
    }
  ){
    directCommission{
      id
      trxId
      consumer{
        username
        id
        country{
          name
          usd1ToLocalCurrency
        }
      }
      consumerReceiver{
        username
        id
        country{
          name
          usd1ToLocalCurrency
        }
      }
      sendingAmt
      amtUsd
      receivingAmt
      totalSellAmt
      totalSellAmtUsd
      isPaid
      productDetails
      
    }
  }
}
`

const useDirectCommisionSend = () => {
  const [directCommisionSendMutationHandler, { data, loading, error }] = useMutation(DIRECT_SEND_COMMISION)

  return {
    directCommisionSendMutationHandler,
    data,
    loading,
    error
  };
};

export default useDirectCommisionSend;

