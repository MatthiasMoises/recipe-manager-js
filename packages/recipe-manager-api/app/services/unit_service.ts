import Unit from '#models/unit'

export class UnitService {
  async getAll(): Promise<Unit[]> {
    const units = await Unit.all()
    return units
  }

  async getOneById(id: number): Promise<Unit> {
    const unit = await Unit.findOrFail(id)
    return unit
  }

  async getOnyBy(key: string, value: string | number): Promise<Unit | null> {
    const unit = await Unit.findByOrFail(key, value)
    return unit
  }

  async save(unitData: Partial<Unit>): Promise<Unit> {
    const unit = new Unit()
    await unit.fill(unitData).save()
    return unit
  }

  async update(UnitData: Partial<Unit>, id: number): Promise<Unit> {
    const unit = await Unit.findOrFail(id)
    await unit.merge(UnitData).save()
    return unit
  }

  async delete(id: number): Promise<void> {
    const unit = await Unit.findOrFail(id)
    await unit.delete()
  }
}
