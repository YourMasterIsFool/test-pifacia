<?php

namespace App\Dto\Audit;

use App\AuditAction;
use App\AuditFeatures;

class CreateAuditDto
{
    public function __construct(
        public string $creator_name,
        public string $notes,
        public AuditAction $action,
        public AuditFeatures $features,
        public string $master_id,
       
    ) {}
}
