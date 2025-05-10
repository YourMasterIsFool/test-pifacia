<?php

namespace App;

enum AuditFeatures: string
{
    //
    case TASK = "task";
    case SUBTASK = "sub_task";
    case PROJECT = "project";
}
