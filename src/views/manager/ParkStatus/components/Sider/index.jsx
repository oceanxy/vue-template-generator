import '../../assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Progress } from 'ant-design-vue'

export default {
  render() {
    return (
      <div class={'park-status-sider'}>
        <div class={'theme-picture'} />
        <BNContainer
          modalTitle={'学校优秀视力健康排行'}
          class={'vision-ranking'}
          width={'100%'}
        >
          <div class={'vision-ranking-item'}>
            <div class={'info'}>
              <span class={'ranking'}>1</span>
              北碚区教师进修学院
              <span class={'process'}>98%</span>
            </div>
            <Progress showInfo={false} percent={30} strokeColor={'#717BBC'} />
          </div>
          <div class={'vision-ranking-item'}>
            <div class={'info'}>
              <span class={'ranking'}>1</span>
              北碚区教师进修学院
              <span class={'process'}>98%</span>
            </div>
            <Progress showInfo={false} percent={30} strokeColor={'#717bbc'} />
          </div>
          <div class={'vision-ranking-item'}>
            <div class={'info'}>
              <span class={'ranking'}>1</span>
              北碚区教师进修学院
              <span class={'process'}>98%</span>
            </div>
            <Progress showInfo={false} percent={30} strokeColor={'#717BBC'} />
          </div>
        </BNContainer>
      </div>
    )
  }
}
