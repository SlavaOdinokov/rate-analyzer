import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface Order {
  id?: number;
  network: number;
  statuses: number;
  makerAsset: string;
  makerAssetSymbol?: string;
  makerAssetDecimals?: number;
  takerAsset: string;
  takerAssetSymbol?: string;
  takerAssetDecimals?: number;
  salt: string;
  makingAmount: string;
  takingAmount: string;
  maker: string;
  source: string;
  rate: string;
}

@Entity({
  name: 'orders'
})
export class OrderSchema implements Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'integer', nullable: false })
  network: number;

  @Column({ type: 'integer', nullable: false })
  statuses: number;

  @Column()
  makerAsset: string;

  @Column({ nullable: true })
  makerAssetSymbol?: string;

  @Column({ type: 'integer', nullable: true })
  makerAssetDecimals?: number;

  @Column()
  takerAsset: string;

  @Column({ nullable: true })
  takerAssetSymbol?: string;

  @Column({ type: 'integer', nullable: true })
  takerAssetDecimals: number;

  @Column()
  salt: string;

  @Column()
  makingAmount: string;

  @Column()
  takingAmount: string;

  @Column()
  maker: string;

  @Column()
  source: string;

  @Column()
  rate: string;
}
