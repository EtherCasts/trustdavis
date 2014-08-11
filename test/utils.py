def hex_pad(x):
    return "{0:#0{1}x}".format(x, 66)

def xhex(x):
    value = "{0:#x}".format(x)
    if len(value) % 2 != 0:
        value = "0x0" + value[2:]
    return value

def xint(x):
    if x == '0x':
        return 0
    return int(x, 16)
