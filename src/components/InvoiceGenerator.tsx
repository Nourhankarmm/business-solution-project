'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

interface InvoiceData {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  from: {
    name: string
    address: string
    email: string
  }
  to: {
    name: string
    address: string
    email: string
  }
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  notes?: string
}

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    from: {
      name: 'Influencer Platform Inc.',
      address: '123 Business Street, City, State 12345',
      email: 'billing@influencerplatform.com'
    },
    to: {
      name: '',
      address: '',
      email: ''
    },
    items: [
      { description: '', quantity: 1, unitPrice: 0, amount: 0 }
    ],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: 'Thank you for your business!'
  })

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceData.items]
    const item = { ...newItems[index] }
    
    if (field === 'description') {
      item.description = value as string
    } else if (field === 'quantity' || field === 'unitPrice') {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value
      item[field] = numValue
      item.amount = item.quantity * item.unitPrice
    }
    
    newItems[index] = item
    updateInvoiceData({ items: newItems })
  }

  const addItem = () => {
    updateInvoiceData({
      items: [...invoiceData.items, { description: '', quantity: 1, unitPrice: 0, amount: 0 }]
    })
  }

  const removeItem = (index: number) => {
    if (invoiceData.items.length > 1) {
      const newItems = invoiceData.items.filter((_, i) => i !== index)
      updateInvoiceData({ items: newItems })
    }
  }

  const updateInvoiceData = (updates: Partial<InvoiceData>) => {
    const newData = { ...invoiceData, ...updates }
    
    // Recalculate totals
    const subtotal = newData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = subtotal * 0.1 // 10% tax for demo
    const total = subtotal + tax
    
    setInvoiceData({
      ...newData,
      subtotal,
      tax,
      total
    })
  }

  const handleDownload = () => {
    // Create a simple text representation for download
    const invoiceText = `
INVOICE #${invoiceData.invoiceNumber}
Issue Date: ${invoiceData.issueDate}
Due Date: ${invoiceData.dueDate}

FROM:
${invoiceData.from.name}
${invoiceData.from.address}
${invoiceData.from.email}

TO:
${invoiceData.to.name}
${invoiceData.to.address}
${invoiceData.to.email}

ITEMS:
${invoiceData.items.map(item => 
  `${item.description} - ${item.quantity} x $${item.unitPrice.toFixed(2)} = $${item.amount.toFixed(2)}`
).join('\n')}

SUBTOTAL: $${invoiceData.subtotal.toFixed(2)}
TAX (10%): $${invoiceData.tax.toFixed(2)}
TOTAL: $${invoiceData.total.toFixed(2)}

NOTES:
${invoiceData.notes}
    `.trim()

    const blob = new Blob([invoiceText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${invoiceData.invoiceNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Generator</CardTitle>
        <CardDescription>Create and download professional invoices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Invoice Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">From</h3>
            <div className="space-y-2">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={invoiceData.from.name}
                  onChange={(e) => updateInvoiceData({ from: { ...invoiceData.from, name: e.target.value } })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={invoiceData.from.address}
                  onChange={(e) => updateInvoiceData({ from: { ...invoiceData.from, address: e.target.value } })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={invoiceData.from.email}
                  onChange={(e) => updateInvoiceData({ from: { ...invoiceData.from, email: e.target.value } })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Bill To</h3>
            <div className="space-y-2">
              <div>
                <Label>Client Name</Label>
                <Input
                  value={invoiceData.to.name}
                  onChange={(e) => updateInvoiceData({ to: { ...invoiceData.to, name: e.target.value } })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={invoiceData.to.address}
                  onChange={(e) => updateInvoiceData({ to: { ...invoiceData.to, address: e.target.value } })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={invoiceData.to.email}
                  onChange={(e) => updateInvoiceData({ to: { ...invoiceData.to, email: e.target.value } })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Invoice Number</Label>
            <Input
              value={invoiceData.invoiceNumber}
              onChange={(e) => updateInvoiceData({ invoiceNumber: e.target.value })}
            />
          </div>
          <div>
            <Label>Issue Date</Label>
            <Input
              type="date"
              value={invoiceData.issueDate}
              onChange={(e) => updateInvoiceData({ issueDate: e.target.value })}
            />
          </div>
          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => updateInvoiceData({ dueDate: e.target.value })}
            />
          </div>
        </div>

        {/* Invoice Items */}
        <div className="space-y-4">
          <h3 className="font-semibold">Items</h3>
          {invoiceData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
              <div className="md:col-span-6">
                <Label>Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Item description"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Qty</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Unit Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="md:col-span-1">
                <Label>Amount</Label>
                <Input
                  value={`$${item.amount.toFixed(2)}`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div className="md:col-span-1">
                <Button
                  variant="outline"
                  onClick={() => removeItem(index)}
                  className="w-full"
                  disabled={invoiceData.items.length === 1}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={addItem} variant="outline">
            Add Item
          </Button>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Notes</Label>
            <Input
              value={invoiceData.notes}
              onChange={(e) => updateInvoiceData({ notes: e.target.value })}
              placeholder="Additional notes..."
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">${invoiceData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span className="font-semibold">${invoiceData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>${invoiceData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleDownload} className="w-full bg-black hover:bg-gray-800">
          Download Invoice
        </Button>
      </CardContent>
    </Card>
  )
}
