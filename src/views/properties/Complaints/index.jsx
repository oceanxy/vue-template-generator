import './assets/styles/index.scss'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import Form from '@/views/properties/Complaints/components/Form'
import PropertyRecords from '@/components/PropertyRecords'

export default {
  render() {
    return (
      <TGContainerWithSider class="tg-suggestions">
        <Form slot="default" />
        <PropertyRecords slot="sider" />
      </TGContainerWithSider>
    )
  }
}
