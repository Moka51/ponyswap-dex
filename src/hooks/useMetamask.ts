export default function useMetamask(){
    const ethereum: any = window.ethereum;

    const suggestToken = async(address: string, symbol: string, decimals = 18, image: string) => {
        try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address, // The address that the token is at.
                    symbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals, // The number of decimals in the token
                    image, // A string url of the token logo
                },
                },
            });

            if (wasAdded.result) {
                return true;
            }           
            return false;
        } catch (error) {            
            return null;
        }
    }

    return {suggestToken}
}