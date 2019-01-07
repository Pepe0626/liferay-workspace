
import java.util.Timer;
import java.util.TimerTask;

class TimerEx {
    public static void main(String arglist[]) {
    Timer timer;
    timer = new Timer();

    TimerTask task = new TimerTask() {
        int tic=0;

        @Override
        public void run()
        {
            if (tic%2==0)
            System.out.println("TIC");
            else
            System.out.println("TOC");
            tic++;
        }
        };
        // Empezamos dentro de 10ms y luego lanzamos la tarea cada 1000ms
    timer.schedule(task, 10, 1000);
    }
}