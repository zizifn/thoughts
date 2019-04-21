#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>


extern int create_process (char* program, char** arg_list);


int create_process (char* program, char** arg_list)
{
    printf("begin create_process!!! \n");
    pid_t child_pid;
    child_pid = fork ();
    if (child_pid != 0)
    {
        printf("child_pid %d \n", child_pid);
        return child_pid;
    }
    else {
        printf("before execvp, child_pid %d", child_pid);
        execvp (program, arg_list);
        printf("end execvp, child_pid %d \n", child_pid);
        exit(0);
        //abort ();
    }
}