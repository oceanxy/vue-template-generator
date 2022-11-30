import './assets/styles/index.scss'
import Functions from './components/Functions'
import QrCode from './components/qrCode'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'GenerateQRCode',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class={'qr-code-container'}>
        <Functions slot="functions" />
        <div slot="default">
          <QrCode />
        </div>
      </TGContainer>
    )
  }
}
