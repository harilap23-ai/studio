'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUploadedMaterials } from "@/lib/data";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadedMaterials() {
  const materials = getUploadedMaterials();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Materials</CardTitle>
        <CardDescription>View and download materials uploaded by faculty.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">{material.fileName}</TableCell>
                <TableCell>{material.subject}</TableCell>
                <TableCell>{material.faculty}</TableCell>
                <TableCell>{material.timestamp.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
