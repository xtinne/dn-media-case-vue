export type EmitActionType = {
  (
    e: 'action',
    payload: {
      action: 'action_media' | 'action_content'
      id: string | number
      title: string
    },
  ): void
}
