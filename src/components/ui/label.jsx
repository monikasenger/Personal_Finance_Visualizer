import * as React from "react"

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={"block text-sm font-medium text-gray-700 mb-1 " + className}
      {...props}
    />
  )
})
Label.displayName = "Label"

export { Label } // ✅ named export
