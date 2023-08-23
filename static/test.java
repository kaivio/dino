import java.lang.System;
import android.widget.Button;
import android.widget.Toast;
import android.app.Activity;
import java.lang.Exception;
import java.lang.Thread;
import java.lang.String;


public class Main{
  public static void main(Activity activity){
    Toast.makeText(activity,"Hello World",1).show();
    new Thread(){
      public void run(){
        for(int i=0;i<1000;i++)
        { 
          System.out.println("Hello World"+i);
          try{
            Thread.sleep(100);
          }catch(Exception e){}
        }
      }
    }.start();
  
  }
}


public class PrimeNumbers {
    public static void primeNumbers(String[] args) {
        int start = 2; // 起始值
        int end = 100; // 结束值

        System.out.println("Prime numbers between " + start + " and " + end + ":");
        for (int i = start; i <= end; i++) {
            if (isPrime(i)) { // 调用isPrime方法判断是否为质数
                System.out.print(i + " ");
            }
        }
    }

    public static boolean isPrime(int number) {
        if (number <= 1)
            return false;
        
        for (int i = 2; i <= Math.sqrt(number); i++) { // 只需检查到平方根即可
            if (number % i == 0)
                return false;
        }
        
       return true;
   } 
}