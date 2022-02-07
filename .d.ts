declare module '@editorjs/list' {
  import { BlockTool } from '@editorjs/editorjs'

  export default class List implements BlockTool {
    save(block: HTMLDivElement)
    render(): HTMLElement
  }
}

declare module '@editorjs/image' {
  import { BlockTool } from '@editorjs/editorjs'

  export default class Image implements BlockTool {
    save(block: HTMLDivElement)
    render(): HTMLElement
  }
}
