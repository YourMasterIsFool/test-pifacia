<?php

namespace App;

enum AuditAction: string
{
    //

    case UPDATE ="update";
    case PRINT = "print";
    case DELETE= "delete";
    case CREATE = "create";
}
