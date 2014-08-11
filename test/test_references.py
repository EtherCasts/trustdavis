from pyethereum import tester

# from pyethereum import processblock
# processblock.enable_debug()


class TestReferences(object):

    @classmethod
    def setup_class(cls):
        cls.code = open('contracts/references.se').read()

    def setup_method(self, method):
        self.s = tester.state()
        self.c = self.s.contract(self.code)

    def test_init(self):
        assert self.s.block.get_storage_data(self.c, 0x10) == int(tester.a0, 16)  # factory
