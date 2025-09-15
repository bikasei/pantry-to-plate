export class PantryItem {
  constructor(name, quantity, unit) {
    this.name = String(name).trim();
    this.quantity = Number(quantity);
    this.unit = unit || 'pcs';
  }

  increase(n = 1) {
    this.quantity += Number(n);
  }

  decrease(n = 1) {
    this.quantity = Math.max(0, this.quantity - Number(n));
  }

  isValid() {
    return this.name.length > 0 && Number.isFinite(this.quantity);
  }
}
