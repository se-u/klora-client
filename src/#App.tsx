import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "./hooks/useCounterContract";
// import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { useTokenContract } from "./hooks/useTokenContract";

function App() {
  const { connected } = useTonConnect();
  const { balance, sendTransfer } = useTokenContract();
  const { contract_address, counter_value, contract_balance, sendIncrement } =
    useCounterContract();
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Our contract Address</b>
          <div className="Hint">
            {String(contract_address)?.slice(0, 30) + "..."}
          </div>
          <b>Our contract Balance</b>
          <div className="Hint">{Number(contract_balance)}</div>
        </div>

        <div className="Card">
          <b>BTL Balance: </b>
          <div>{balance ?? "Loading..."}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        {connected && (
          <a
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment
          </a>
        )}
        <br />
        <a
          onClick={() => {
            sendTransfer();
          }}
        >
          transfer
        </a>
      </div>
    </div>
  );
}

export default App;
