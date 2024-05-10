# TACT Compilation Report
Contract: Barter
BOC Size: 1841 bytes

# Types
Total Types: 16

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## SetItem
TLB: `set_item#09215804 address:address name:^string max:uint32 total:uint32 = SetItem`
Signature: `SetItem{address:address,name:^string,max:uint32,total:uint32}`

## AddBottle
TLB: `add_bottle#10e1ef71 address:address amount:uint32 = AddBottle`
Signature: `AddBottle{address:address,amount:uint32}`

## SendBottle
TLB: `_ masterAddress:address name:^string senderAddress:address total:uint32 = SendBottle`
Signature: `SendBottle{masterAddress:address,name:^string,senderAddress:address,total:uint32}`

## ArgSendBottle
TLB: `arg_send_bottle#c8e63058 masterAddress:address senderAddress:address name:^string total:uint32 = ArgSendBottle`
Signature: `ArgSendBottle{masterAddress:address,senderAddress:address,name:^string,total:uint32}`

## ArgVerifyBottle
TLB: `arg_verify_bottle#625d6b4e address:address amount:int257 = ArgVerifyBottle`
Signature: `ArgVerifyBottle{address:address,amount:int257}`

## Item
TLB: `_ name:Maybe ^string max:Maybe uint256 total:Maybe uint256 = Item`
Signature: `Item{name:Maybe ^string,max:Maybe uint256,total:Maybe uint256}`

## Master
TLB: `_ name:^string camp:^string phone:uint256 totalBottle:uint256 status:bool = Master`
Signature: `Master{name:^string,camp:^string,phone:uint256,totalBottle:uint256,status:bool}`

## ArgAddMaster
TLB: `arg_add_master#0d7d0ac3 master:address name:^string camp:^string phone:uint256 totalBottle:uint256 status:bool = ArgAddMaster`
Signature: `ArgAddMaster{master:address,name:^string,camp:^string,phone:uint256,totalBottle:uint256,status:bool}`

## ArgWaitMaster
TLB: `arg_wait_master#8902bf7d sender:address master:address = ArgWaitMaster`
Signature: `ArgWaitMaster{sender:address,master:address}`

## ArgClearSendBottle
TLB: `arg_clear_send_bottle#3f6e38ae masterAddress:address = ArgClearSendBottle`
Signature: `ArgClearSendBottle{masterAddress:address}`

# Get Methods
Total Get Methods: 5

## isMaster
Argument: sender

## Master

## StatusMaster
Argument: master
Argument: sender

## SendBottles

## TotalBottle
Argument: address

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract