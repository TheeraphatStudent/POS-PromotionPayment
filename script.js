window.onload = function currentDate() {
    var date = new Date();

    var datetime = date.getDate() + "/"
        + (date.getMonth() + 1) + "/"
        + date.getFullYear() + " | "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();

    var displayDate = document.getElementById("currentDate");

    displayDate.innerHTML = datetime
    setTimeout(currentDate, 1000)
}

class KumtoOrder {
    constructor() {
        this.result = 0;
        this.isCheese = false;
        this.option = '';
        this.count = 1;
        this.total = 0;
        this.totalCount = 0;
        this.history = [];
        this.updateDisplay();
    }

    updateDisplay() {
        const display = document.getElementById("result");
        const totalCount = document.getElementById("totalCount");
        const countDisplay = document.getElementById("count");

        if (this.isCheese) {
            display.classList.add("cheese");
        } else {
            display.classList.remove("cheese");
        }

        totalCount.innerHTML = this.result * this.count;
        display.innerHTML = this.result;
        countDisplay.innerHTML = this.count;
        // this.isCheese = false;
    }

    selectOption(option) {
        this.option = option;
        this.calculatePrice();
        this.updateDisplay();
    }

    toggleCheese(hasCheese) {
        this.isCheese = hasCheese;
        this.calculatePrice();
        this.updateDisplay();
    }

    calculatePrice() {
        const basePrices = {
            'small': 30,
            'normal': 40,
            'medium': 60,
            'large': 100
        };

        const sizePrice = basePrices[this.option];
        // this.count = 1

        this.result = this.isCheese ? sizePrice + this.getSizeAdjustment() : sizePrice;
    }

    getSizeAdjustment() {
        const sizeAdjustments = {
            'small': 5,
            'normal': 10,
            'medium': 15,
            'large': 20
        };

        return sizeAdjustments[this.option] || 0;
    }

    incrementCount() {
        this.count++;
        this.updateDisplay();
    }

    decrementCount() {
        if (this.count > 0) {
            this.count--;
            this.updateDisplay();
        }
    }

    saveResult() {
        if (this.result === 0 || this.count === 0) {

            const confirmResult = confirm("Please select an option before saving. Do you want to reset the count to 1?");
            if (confirmResult) {
                this.count = 1;
                this.updateDisplay();
            }
            return;
        }

        const date = new Date();
        const orderDetails = {
            promotion: this.option,
            count: this.count,
            price: this.result,
            dateTime: date.toLocaleString()
        };

        this.history.push(orderDetails);

        this.totalCount = this.result * this.count;
        this.total += this.totalCount;

        document.getElementById("total").innerText = this.total;
        document.getElementById("soldMessage").innerText = `${this.option} has been sold!`;

        this.updateHistory();
        this.clearResult();
        this.count = 1;
        this.isCheese = false;
        this.updateDisplay();
    }


    getCount() {
        const countMap = {
            'small': 5,
            'normal': 8,
            'medium': 13,
            'large': 22
        };
        return countMap[this.option] || 0;
    }

    updateHistory() {
        const historyDisplay = document.getElementById("history");
        historyDisplay.innerHTML = '';

        this.history.forEach((order, index) => {
            const historyItem = document.createElement("div");
            historyItem.innerHTML = `${index + 1}. ${order.promotion} - Count: ${order.count} - Price: ${order.price} - Total: ${order.price * order.count} - Date: ${order.dateTime}`;
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.style.marginLeft = "5px";
            deleteButton.onclick = () => this.deleteHistoryItem(index);
            historyItem.appendChild(deleteButton);
            historyDisplay.appendChild(historyItem);
        });
    }

    deleteHistoryItem(index) {
        this.total -= this.history[index].price * this.history[index].count;
        document.getElementById("total").innerText = this.total;
        this.history.splice(index, 1);
        this.updateHistory();
    }

    clearResult() {
        this.result = 0;
        this.count = 1;
        this.updateDisplay();
    }

    clearHistory() {
        this.total = 0;
        this.history = [];
        document.getElementById("total").innerText = this.total;
        this.updateHistory();
    }
}

const order = new KumtoOrder();