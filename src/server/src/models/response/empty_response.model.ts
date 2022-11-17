export class EmptyResponseDto {
  status: string;

  constructor(status: 'Success' | 'Failed') {
    this.status = status;
  }
}
