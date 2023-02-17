import { type Db } from 'mongodb'
import WebSocket from 'ws'
import client, { connectRepl } from './mongo-connection'
import { sleep } from './utils'

const server = new WebSocket.Server({ port: 5500 })

async function startTestServer(repl: Db | undefined) {
	try {
		const ypricedatas = repl?.collection('ypricedatas')
		if (!ypricedatas) {
			throw new Error('Collection ypricedatas does not exist!')
		}

		const docs = ypricedatas.find()

		server.on('connection', async socket => {
			await docs.forEach(doc => {
				const { _id, ...ypd } = doc
				console.log(_id)
				socket.send(JSON.stringify(ypd))
				sleep(30)
			})
		});

	} catch (e: unknown) {
		client.close()
	}
}

async function main(){
	const repl = await connectRepl();
	repl && await startTestServer(repl)
}

main();