import Upload from '@/components/BNUploadPictures'
export default {
  props: {
    data: Object
  },
  render() {
    return <Upload action={'/api/system/upload/image'} limit={1}></Upload>
  }
}
