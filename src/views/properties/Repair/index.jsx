import './assets/styles/index.scss'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import Form from '@/views/properties/Repair/components/Form'
import PropertyRecords from '@/components/PropertyRecords'

export default {
  render() {
    return (
      <TGContainerWithSider class="tg-repair">
        <Form slot="default" />
        <PropertyRecords slot="sider" />
      </TGContainerWithSider>
    )
  }
}
