import { Construct } from 'constructs'
import { App, TerraformStack, TerraformOutput } from 'cdktf'
import { AwsProvider, Instance } from './.gen/providers/aws'

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    new AwsProvider(this, 'aws', {
      region: 'cn-northwest-1',
    })

    const instance = new Instance(this, 'compute', {
      ami: 'ami-0b59d95ee05e01aca',
      instanceType: 't2.micro',
    })

    new TerraformOutput(this, 'public_ip', {
      value: instance.publicIp,
    })
  }
}

const app = new App()
new MyStack(app, 'typescript-aws')
app.synth()

