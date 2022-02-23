window.$ = window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    return {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                console.log(elements[i])
                elements[i].classList.add(className)
            }
            return this
        },
        find(selector) {
            let array = [];
            for (let i = 0; i < elements.length; i++) {//遍历拿到elements下面的所有selector节点
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                console.dir(elements2)
                array = array.concat(elements2)//合并数组
            }
            const newApi = jQuery(array);
            return newApi
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)//传参过去，直接可以调用
            }
            return this
        },
        parent() {
            const array = [];
            this.each((node) => {
                //console.log(node.parentNode); console.log('第' + i) 
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            })
            return jQuery(array);
        },
        children() {
            const array = [];
            this.each((node) => {
                if (array.indexOf(node.children) === -1) {
                    array.push(...node.children);//展开操作符  把node.children里面的数组拿出来
                }
            });
            return jQuery(array)

        },
        siblings() {
            const array = []
            this.each((node) => {
                // array.push(...node.parentNode.children);
                array.push(...Array.from(node.parentNode.children).filter(n => n !== node));
            });
            return jQuery(array)
        },
        index() {
            let i;
            this.each((node) => {
                let list = node.parentNode.children;
                for (i = 0; i < list.length; i++) {
                    if (list[i] === node) {
                        break;
                    }
                }
            })
            return i;
        },
        next() {
            let x;
            this.each((node) => {
                x = node.nextSibling;
                if (x && x.nodeType === 3) {
                    x = x.nextSibling;
                }
            })
            return x;
        },
        prev() {
            let x;
            this.each((node) => {
                x = node.previousSibling;
                if (x && x.nodeType === 3) {
                    x = x.previousSibling;
                }
            })
            return x;
        },
        print() {
            console.log(elements)
        }
    }
}