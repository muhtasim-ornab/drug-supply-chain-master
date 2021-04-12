const Web3 = require('web3')
const rpcUrl = "http://localhost:8000"
// const Web3Personal = require('web3-shh')
// const shh = new Web3Personal(rpcUrl)
const web3 = new Web3(rpcUrl) 
//const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
var Accounts = require('web3-eth-accounts')
var keyth = require('keythereum')
const Tx = require('ethereumjs-tx').Transaction
const ContractGet = require('./app/models/contract')



//console.log(web3.eth.accounts)

// console.log(Web3.version)


var accoutOrpaKey = process.env.privateKeyOf1;

var abi = [
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "orderId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "depotId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "seller",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "fromAdd",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "toAdd",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "role",
				"type": "string"
			}
		],
		"name": "logDrugInfo",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "depotId",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isDepotId_",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isSeller_",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "seller",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_orderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_depotId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_seller",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fromAdd",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_toAdd",
				"type": "string"
			}
		],
		"name": "storeDrugs",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

var bytecode = "0x" + "608060405233600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610e1f806100546000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806308551a531461005c57806332c9ce0a146100a65780637c74d4f3146100f05780639755963e14610112578063aea9b07d14610429575b600080fd5b61006461044b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100ae610471565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100f8610497565b604051808215151515815260200191505060405180910390f35b610427600480360360a081101561012857600080fd5b810190808035906020019064010000000081111561014557600080fd5b82018360208201111561015757600080fd5b8035906020019184600183028401116401000000008311171561017957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156101dc57600080fd5b8201836020820111156101ee57600080fd5b8035906020019184600183028401116401000000008311171561021057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561027357600080fd5b82018360208201111561028557600080fd5b803590602001918460018302840111640100000000831117156102a757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561030a57600080fd5b82018360208201111561031c57600080fd5b8035906020019184600183028401116401000000008311171561033e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156103a157600080fd5b8201836020820111156103b357600080fd5b803590602001918460018302840111640100000000831117156103d557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506104ef565b005b610431610c9c565b604051808215151515815260200191505060405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146105b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4d6573736167652066726f6d204d616e7566616374757265720000000000000081525060200191505060405180910390fd5b84600160028111156105c057fe5b6000826040518082805190602001908083835b602083106105f657805182526020820191506020810190506020830392506105d3565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060050160009054906101000a900460ff16600281111561064557fe5b141561069c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526028815260200180610dc36028913960400191505060405180910390fd5b856002808111156106a957fe5b6000826040518082805190602001908083835b602083106106df57805182526020820191506020810190506020830392506106bc565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060050160009054906101000a900460ff16600281111561072e57fe5b1415610785576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180610d9a6029913960400191505060405180910390fd5b866000886040518082805190602001908083835b602083106107bc5780518252602082019150602081019050602083039250610799565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206000019080519060200190610805929190610cf4565b50856000886040518082805190602001908083835b6020831061083d578051825260208201915060208101905060208303925061081a565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206001019080519060200190610886929190610cf4565b50846000886040518082805190602001908083835b602083106108be578051825260208201915060208101905060208303925061089b565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206002019080519060200190610907929190610cf4565b50836000886040518082805190602001908083835b6020831061093f578051825260208201915060208101905060208303925061091c565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206003019080519060200190610988929190610cf4565b50826000886040518082805190602001908083835b602083106109c0578051825260208201915060208101905060208303925061099d565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206004019080519060200190610a09929190610cf4565b507fca01b822d94f4b3dfa45d841ecfe8823af53b351e054ec8aace6ce43ad80b7ef87878787876040518080602001806020018060200180602001806020018060200187810387528c818151815260200191508051906020019080838360005b83811015610a84578082015181840152602081019050610a69565b50505050905090810190601f168015610ab15780820380516001836020036101000a031916815260200191505b5087810386528b818151815260200191508051906020019080838360005b83811015610aea578082015181840152602081019050610acf565b50505050905090810190601f168015610b175780820380516001836020036101000a031916815260200191505b5087810385528a818151815260200191508051906020019080838360005b83811015610b50578082015181840152602081019050610b35565b50505050905090810190601f168015610b7d5780820380516001836020036101000a031916815260200191505b50878103845289818151815260200191508051906020019080838360005b83811015610bb6578082015181840152602081019050610b9b565b50505050905090810190601f168015610be35780820380516001836020036101000a031916815260200191505b50878103835288818151815260200191508051906020019080838360005b83811015610c1c578082015181840152602081019050610c01565b50505050905090810190601f168015610c495780820380516001836020036101000a031916815260200191505b508781038252600f8152602001807f4465706f7420496e2d63686172676500000000000000000000000000000000008152506020019b50505050505050505050505060405180910390a150505050505050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610d3557805160ff1916838001178555610d63565b82800160010185558215610d63579182015b82811115610d62578251825591602001919060010190610d47565b5b509050610d709190610d74565b5090565b610d9691905b80821115610d92576000816000905550600101610d7a565b5090565b9056fe536f6d657468696e672069732057726f6e672066726f6d204465706f74496e636861726765203a2820536f6d657468696e672069732057726f6e672066726f6d204d616e756661637475726572203a2820a265627a7a72315820238fc560f1a90da200ca6751f00045d36365c6cb569b8bc1dd7b6da994246e2664736f6c63430005110032";
	
	

//  console.log("Success");
function deployContract(){

	web3.eth.getAccounts().then(async function (accounts){
		// if(err =>{
		// 	console.log(err)
		// })
		var drugContract = new web3.eth.Contract(abi);
		//console.log(drugContract)

		var deployData = await drugContract.deploy({
			data: bytecode
		}).encodeABI();

		const tx={
			chainId: 23112,
			data: deployData,
			gas:600000*1.50
		}
		
		//var BaseAccount = keyth.recover('new1',keyth.importFromFile(accounts[0], './block/data/')).toString('hex')

		web3.eth.accounts.signTransaction(tx, "0x"+ accoutOrpaKey).then(signed =>{
			web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', async function(response){
				console.log(response)

				
				// const newContract = new ContractGet({
				// 	blockHash: response.blockHash,
				// 	blockNumber: response.blockNumber,
				// 	contractAddress: response.contractAddress,
				// 	cumulativeGasUsed: response.cumulativeGasUsed,
				// 	from: response.from,
				// 	gasUsed: response.gasUsed,
				// 	logsBloom: response.logsBloom,
				// 	status: response.status,
				// 	to: response.to,
				// 	transactionHash: response.transactionHash,
				// 	transactionIndex: response.transactionIndex,
				// 	type: response.type
				// })

				// const conSave = await newContract.save();
				// console.log(conSave)
			 
			})
			
		})
		//console.log(deployData)
	})



 }


module.exports = deployContract