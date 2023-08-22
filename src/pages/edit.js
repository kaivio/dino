import React, { useState, useEffect } from 'react';

import CodeMirror, { EditTabs } from '@site/src/comp/cm6';


export default function Blank() {
  const files = [
    {
      title: "File 1.js",
      doc: `function greet() {\n  console.log("Hello, world!");\n}`,
      lang: "javascript"
    },
    {
      title: "File 2.cpp",
      doc: `#include <iostream>
#include <vector>

using namespace std;

// 交换数组中两个元素的位置
void swap(vector<int>& arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 将小于等于基准值的元素放在左边，大于基准值的元素放在右边，并返回基准索引
int partition(vector<int>& arr, int low, int high) {
    // 选择最后一个元素作为基准值
    int pivot = arr[high];

    // 定义左指针和右指针
    int left = low;
    int right = high - 1;

    while (true) {
        while (left <= right && arr[left] < pivot) {
            left++;
        }

        while (right >= left && arr[right] > pivot) {
            right--;
        }

        if (left >= right) { // 指针相遇时停止循环
            break;
        }

        // 交换左指针和右指针所对应的元素
        swap(arr, left, right);
        
         // 移动指针继续比较剩余部分的数值大小关系 
         left++;
         right--;
     }
    
     // 将基准值放到正确位置上（此时left即为正确位置）
     swap(arr, left, high);

     return left; 
}

// 快速排序递归函数
void quickSortHelper(vector<int>& arr, int low, int high) {
    if (low < high) {
        // 根据基准值将数组划分为两个子数组
        int pivotIndex = partition(arr, low, high);

        // 对左侧子数组进行递归排序
        quickSortHelper(arr, low, pivotIndex - 1);

         // 对右侧子数组进行递归排序
         quickSortHelper(arr, pivotIndex + 1, high);
     }
}

// 快速排序函数（对外接口）
void quickSort(vector<int>& arr) {
    if (arr.empty()) { 
       return;
   }

   quickSortHelper(arr, 0, arr.size() - 1);
}

int main() {
    vector<int> arr = {7, 2 ,1 ,6 ,8 ,5};
    
    cout << "Original array: ";
    for (int i : arr) {
       cout << i << " ";
   }

   quickSort(arr);

   cout << "\nSorted array: ";
   for (int i : arr) {
       cout << i << " ";
   }

   return 0;
}
      `,
      lang: "cpp"
    },
    {
      title: "File 3.java",
      doc:
        'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!"); \n  }\n}',
      lang: "java"
    }
  ];


  const ref = {}
  function name(params) {
    ref.tabnew({ title, doc, lang })
    ref.get_editor().state.doc
    ref.state.tabs[ref.state.active].wait_save = true
    ref.setState([...ref.state])

  }
  useEffect(() => {
    for (let f of files) {
      ref.tabnew(f, { to: false })
    }
    ref.tabnew({ title: 'snippets/default.json', lang: 'json' }, { to: false })

  }, [])

  return (<>
    {/* <EditGroup self={ref} files={files} /> */}
    <EditTabs self={ref}
      onSave={() => {
        console.log('save');
      }}
      onRun={() => {
        // 读取编辑器的内容
        let doc = ref.get_editor().state.doc.toString()

        let tab_size = 2
        let text = doc.replace(new RegExp(`^ {${tab_size}}`, 'gm'), '\t')
        let out = JSON.stringify({
          body: text.split('\n'),
          description: 'description'
        }, ' ', 2)

        // 写入编辑器的内容
        const tab = 3
        ref.get_editor(tab).dispatch({
          changes: {
            from: 0,
            to: ref.get_editor(tab).state.doc.length,
            insert: out
          }
        })
        ref.tabnext(tab)
        
        ref.setMessage('ok')
        setTimeout(()=>ref.setMessage('---------'), 1000)
        setTimeout(()=>ref.setMessage('2222222222'), 2000)
        setTimeout(()=>ref.setMessage('3333333333'), 4000)
        setTimeout(()=>ref.setMessage('4444444444'), 6000)

      }}

    />

    {/* <button onClick={() => {


    }}>生成 vs code 代码片段</button> */}
  </>)
}
