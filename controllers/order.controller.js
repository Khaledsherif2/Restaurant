const { egyptArabicDate } = require("../utils/date");

class OrderController {
  constructor(orderRepository, menuRepository) {
    this.orderRepository = orderRepository;
    this.menuRepository = menuRepository;
  }

  async getOrders() {
    const orders = await this.orderRepository.getOrders();
    return orders;
  }

  async getUserOrders(userId) {
    const orders = await this.orderRepository.getUserOrders(userId);
    return orders;
  }

  async placeOrder(id, data) {
    let newData = data;
    newData.userId = id;
    const items = await Promise.all(
      newData.items.map((item) =>
        this.menuRepository.getItemById(item.menuItemId)
      )
    );
    const totalPrice = items.reduce((total, item, index) => {
      const priceArray = item.price;
      let priceNumber = 0;
      switch (newData.items[index].size) {
        case "Small":
          priceNumber = parseFloat(priceArray[0].replace(/[^\d.]/g, ""));
          break;
        case "Medium":
          priceNumber = parseFloat(priceArray[1].replace(/[^\d.]/g, ""));
          break;
        case "Large":
          priceNumber = parseFloat(priceArray[2].replace(/[^\d.]/g, ""));
          break;
        default:
          priceNumber = parseFloat(priceArray[0].replace(/[^\d.]/g, ""));
      }

      const quantity = newData.items[index].quantity;
      return total + priceNumber * quantity;
    }, 0);

    newData.totalPrice = totalPrice;
    newData.createdAt = egyptArabicDate;
    const order = await this.orderRepository.placeOrder(newData);
    return order;
  }

  async updateOrder(id, data) {
    if (data.items) {
      let newData = data;
      const items = await Promise.all(
        newData.items.map((item) =>
          this.menuRepository.getItemById(item.menuItemId)
        )
      );
      const totalPrice = items.reduce((total, item, index) => {
        const priceArray = item.price;
        let priceNumber = 0;
        switch (newData.items[index].size) {
          case "Small":
            priceNumber = parseFloat(priceArray[0].replace(/[^\d.]/g, ""));
            break;
          case "Medium":
            priceNumber = parseFloat(priceArray[1].replace(/[^\d.]/g, ""));
            break;
          case "Large":
            priceNumber = parseFloat(priceArray[2].replace(/[^\d.]/g, ""));
            break;
          default:
            priceNumber = parseFloat(priceArray[0].replace(/[^\d.]/g, ""));
        }

        const quantity = newData.items[index].quantity;
        return total + priceNumber * quantity;
      }, 0);

      newData.totalPrice = totalPrice;
    }
    const updatedOrder = await this.orderRepository.updateOrder(id, data);
    return updatedOrder;
  }

  async deleteOrder(orderId, user) {
    await this.orderRepository.deleteOrder(orderId, user);
    return;
  }
}

module.exports = OrderController;
